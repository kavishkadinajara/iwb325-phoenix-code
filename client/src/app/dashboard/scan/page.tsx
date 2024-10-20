/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { markAttendance } from "@/actions/tickets";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QRScannerDashboard() {
  const [scanning, setScanning] = useState(false);
  const { toast } = useToast();

  const [data, setData] = useState("No result");
  const [scannedList, setScannedList] = useState<string[]>([]);

  // This is a mock function. Replace it with your actual logic.
  const handleScannedText = async (text: string) => {
    try {
      await markAttendance(text);
      console.log("Scanned text:", text);
      setData(text);
      setScannedList([...scannedList, text]);
      toast({
        title: "QR code scanned",
        description: text,
        type: "foreground",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while scanning the QR code",
        type: "background",
      });
    }

  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">QR Scanner Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>QR Scanner</CardTitle>
          </CardHeader>
          <CardContent>
            {scanning ? (
              <div className="aspect-square">
                <QrReader
                  onResult={(result, error) => {
                    if (!!result) {
                      // @ts-expect-error
                      handleScannedText(result.text as string);
                      //setData(result?.text as string);
                    }

                    if (!!error) {
                      console.info(error);
                    }
                  }}
                  constraints={{ facingMode: "user" }}
                  className="w-60"
                />
              </div>
            ) : (
              <Button onClick={() => setScanning(true)}>Start Scanning</Button>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Scan Result</CardTitle>
          </CardHeader>
          <CardContent>
            {scannedList.length > 0 ? (
              <ul>
                {scannedList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No QR code scanned yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
