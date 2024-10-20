/* eslint-disable jsx-a11y/alt-text */
import ReactPDF, {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import QRCode from "qrcode";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    fontFamily: "Helvetica",
  },
  section: {
    margin: 10,
    padding: 10,
    flexDirection: "row",
    flexGrow: 1,
    border: "1px solid #eaeaea",
    borderRadius: 5,
    gap: 10,
    justifyContent: "space-between",
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
    alignSelf: "center",
  },
  details: {
    flexGrow: 1,
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: "#555",
  },
  qrCode: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
    alignSelf: "center",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 12,
    color: "#aaa",
  },
});

// Define the types for event details
interface EventDetails {
  name: string;
  date: string;
  time: string;
  attendeeName: string;
  email: string;
  price: number;
}

// Create the PDF document component
const TicketPDF = ({
  eventDetails,
  qrDataURL,
}: {
  eventDetails: EventDetails;
  qrDataURL: string;
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <Document
      title={`${eventDetails.attendeeName} - ${eventDetails.name} Ticket`}
    >
      <Page size="A5" style={styles.page} orientation="landscape">
        <Image style={styles.logo} src="https://eventure.vercel.app/base.png" />
        <View style={styles.section}>
          <View>
            <Text style={styles.header}>{eventDetails.name}</Text>
            <View style={styles.details}>
              <Text style={styles.text}>
                Date:{" "}
                {new Date(eventDetails.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
              <Text style={styles.text}>
                Time:{" "}
                {new Date(`1970-01-01T${eventDetails.time}`).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }
                )}
              </Text>
              <Text style={styles.text}>Name: {eventDetails.attendeeName}</Text>
              <Text style={styles.text}>Email: {eventDetails.email}</Text>
              {eventDetails.price > 0 && (
                <Text style={styles.text}>
                  Price:{" "}
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "LKR",
                  }).format(eventDetails.price)}
                </Text>
              )}
            </View>
          </View>
          <Image style={styles.qrCode} src={qrDataURL} />
        </View>
        <Text style={styles.footer}>
          ©️ {currentYear} Eventure. All rights reserved.
        </Text>
      </Page>
    </Document>
  );
};

export async function GET(
  req: Request,
  { params }: { params: { ticketId: string } }
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BAL_URL}/events/ticket_details?ticketId=${params.ticketId}`
    );
  
    const ticket = await res.json();

    if (ticket.status !== 1) {
      return NextResponse.json(
        { error: "Ticket not activated" },
        { status: 400 }
      );
    }

    const eventDetails: EventDetails = {
      name: ticket.event.name,
      date: ticket.event.date,
      time: ticket.event.time,
      attendeeName: ticket.name,
      email: ticket.email,
      price: ticket.event.ticket_price,
    };

    const qrDataURL = await QRCode.toDataURL(params.ticketId, {
      errorCorrectionLevel: "H",
      type: "image/png",
      margin: 1,
      version: 5,
    });

    // Render the PDF document to a stream
    const pdfStream = await ReactPDF.renderToStream(
      <TicketPDF eventDetails={eventDetails} qrDataURL={qrDataURL} />
    );

    // Set the appropriate headers and return the PDF data
    return new NextResponse(pdfStream as unknown as ReadableStream, {
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to generate ticket PDF" },
      { status: 500 }
    );
  }
}
