/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  interface SupportInquiryProps {
    userName?: string;
    subject?: string;
    message?: string;
  }
  
  export const SupportInquiry = ({
    userName,
    subject,
    message,
  }: SupportInquiryProps) => {
    const previewText = `${subject} from ${userName}`;
  
    return (
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
  
        <Body style={main}>
          <Container style={container}>
            <Section style={{ paddingBottom: "20px" }}>
              <Row>
                <Text style={heading}>New inquiry from {userName}</Text>
                <Text style={paragraph}>Subject: {subject}</Text>
                <Text style={review}>{message}</Text>
              </Row>
            </Section>
            <Hr style={hr} />
            <Section>
              <Row>
                <Hr style={hr} />
                <Text style={footer}>© 2024 | EVENTURE | All rights reserved</Text>
                <Link href="https://eventurelk.vercel.app/support" style={reportLink}>
                  Report unsafe behavior
                </Link>
              </Row>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  };
  
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    width: "580px",
    maxWidth: "100%",
  };
  
  const userImage = {
    margin: "0 auto",
    marginBottom: "16px",
    borderRadius: "50%",
  };
  
  const heading = {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    color: "#484848",
  };
  
  const paragraph = {
    fontSize: "18px",
    lineHeight: "1.4",
    color: "#484848",
  };
  
  const review = {
    ...paragraph,
    padding: "24px",
    backgroundColor: "#f2f3f3",
    borderRadius: "4px",
  };
  
  const button = {
    backgroundColor: "#ff5a5f",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "18px",
    paddingTop: "19px",
    paddingBottom: "19px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    width: "100%",
  };
  
  const link = {
    ...paragraph,
    color: "#ff5a5f",
    display: "block",
  };
  
  const reportLink = {
    fontSize: "14px",
    color: "#9ca299",
    textDecoration: "underline",
  };
  
  const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
  };
  
  const footer = {
    color: "#9ca299",
    fontSize: "14px",
    marginBottom: "10px",
  };