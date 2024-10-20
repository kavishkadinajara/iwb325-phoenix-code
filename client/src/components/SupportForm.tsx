"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSupport } from "@/actions/Support";
import SubmitButton from "@/components/SubmitButton";
import { useToast } from "./ui/use-toast";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";

const SupportForm = () => {
  const initialState = {
    message: "",
    status: 0,
  };

  const [state, formAction] = useFormState(contactSupport, initialState);
  const [successMessage, setSuccessMessage] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    if (state.status === 200) {
      toast({
        title: "Success",
        description: state.message,
        type: "background",
      });
      setSuccessMessage(state.message);
    } else if (state.status === 400) {
      toast({
        title: "Error",
        description: state.message,
        type: "foreground",
      });
    }
  }, [state.message, state.status]);
  return (
    <Card className="w-full max-w-md py-5">
      <CardContent>
        {successMessage && (
          <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
            {successMessage}
          </div>
        )}
        <form action={formAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Enter your name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Briefly describe your inquiry"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Provide more details about your inquiry"
              className="min-h-[150px]"
            />
          </div>
          {/* <Button type="submit" className="w-full">
                      Submit Inquiry
                    </Button> */}
          <SubmitButton className="w-full" pendingText="Submitting">
            Submit Inquiry
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};
export default SupportForm;