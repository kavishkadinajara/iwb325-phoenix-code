/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface TicketConfirmationProps {
  username: string;
  event: string;
  eventImage: string;
  date: string;
  time: string;
  location: string;
  ticketId: string;
  ticketUrl: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const TicketConfirmation = ({
  username,
  event,
  eventImage,
  date,
  time,
  location,
  ticketId,
  ticketUrl,
}: TicketConfirmationProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your Ticket for {event}</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Img src={`${baseUrl}/base.png`} />
          </Section>

          <Section style={content}>
            <Row>
              <Img style={image} width={620} src={eventImage} />
            </Row>

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Hi {username},
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Thank you for your purchase!. Here's your ticket for {event}.
                </Heading>

                <Text style={paragraph}>
                  <b>Date: </b>
                  {date}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Time: </b>
                  {time}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Location: </b>
                  {location}
                </Text>
                <Text
                  style={{
                    color: "rgb(0,0,0, 0.5)",
                    fontSize: 14,
                    marginTop: -5,
                  }}
                ></Text>

                <Text style={paragraph}>
                  Please download your ticket below. Remember to bring it with
                  you on the day of the event, either digitally or printed.
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <Button href={ticketUrl} style={button}>
                  Download Ticket
                </Button>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img
              style={image}
              width={620}
              src={`https://eventurelk.vercel.app/email-footer.png`}
            />
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © 2024 | EVENTURE | All rights reserved
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default TicketConfirmation;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
