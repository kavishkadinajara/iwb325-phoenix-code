"use client";

import { submitPayment } from "@/actions/Admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { CopyIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "../SubmitButton";

interface PaymentFormProps {
  data: {
    user_id: string;
    user_name: string;
    account_name: string;
    account_number: string;
    bank: string;
    branch: string;
    to_be_paid: number;
  };
}

const PaymentForm = ({ data }: PaymentFormProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const [receiptImage, setReceiptImage] = useState<File | null>(null);
  const [fileInputValue, setFileInputValue] = useState<string>("");

  const initialState = {
    message: "",
    status: 0,
  };

  const [state, formAction] = useFormState(submitPayment, initialState);

  useEffect(() => {
    if (state.status === 200) {
      toast({
        title: "Success",
        description: state.message,
        type: "foreground",
      });

      router.push("/dashboard/events");
    } else if (state.status === 400) {
      toast({
        title: "Error",
        description: state.message,
        type: "foreground",
      });
    }
  }, [state.message, state.status]);
  return (
    <div className="space-y-6 max-w-5xl mx-auto ">
      <Button
        onClick={() => {
          navigator.clipboard.writeText(
            `Bank Account Name: ${data.user_name}\nBank Account Number: ${data.account_number}\nBank Account Branch: ${data.branch}\nBank Name: ${data.bank}`
          );
          toast({
            title: "Copied",
            description: "Account details copied to clipboard",
            type: "foreground",
          });
        }}
      >
        Copy Account Details
        <CopyIcon className="ml-2" />
      </Button>
      <Card>
        <CardContent>
          <form action={formAction} className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user-id">User ID:</Label>
                <Input
                  id="user-id"
                  name="user-id"
                  type="text"
                  defaultValue={data.user_id}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  defaultValue={data.to_be_paid}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="account-name">Bank Account Name</Label>
                <Input
                  id="account-name"
                  name="account-name"
                  defaultValue={data.account_name}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-number">Bank Account Number</Label>
                <Input
                  id="account-number"
                  name="account-number"
                  type="text"
                  defaultValue={data.account_number}
                  readOnly
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="account-branch">Bank Account Branch</Label>
                <Input
                  id="account-branch"
                  name="account-branch"
                  type="text"
                  defaultValue={data.branch}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bank-name">Bank Name</Label>
                <Input
                  id="bank-name"
                  name="bank-name"
                  type="text"
                  defaultValue={data.bank}
                  readOnly
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="receipt">Receipt</Label>
              <Input
                id="receipt"
                name="receipt"
                type="file"
                accept="image/*"
                value={fileInputValue}
                onChange={(e) => {
                  const file = e.target?.files?.[0];
                  if (file) {
                    if (file.size > MAX_FILE_SIZE) {
                      alert("File size exceeds the 5MB limit.");
                      setReceiptImage(null);
                      setFileInputValue("");
                    } else {
                      setReceiptImage(file);
                      setFileInputValue(e.target.value);
                    }
                  }
                }}
              />
            </div>
            <div>
              {receiptImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={URL.createObjectURL(receiptImage)}
                  alt="Uploaded Receipt"
                  className="w-full max-h-[400px] object-contain"
                  width="400"
                  height="200"
                  style={{ aspectRatio: "400/200", objectFit: "cover" }}
                />
              )}
            </div>
            <SubmitButton
              className="w-fit justify-self-end"
              pendingText="Submitting"
            >
              Submit Payment
            </SubmitButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default PaymentForm;