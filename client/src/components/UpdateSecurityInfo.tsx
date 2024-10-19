/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "./SubmitButton";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useFormState } from "react-dom";
import { updateSecurityInfo } from "@/actions/Settings";

const UpdateSecurityInfo = ({ data }: { data: any }) => {
  const initialState = {
    message: "",
    status: 0,
  };

  const [state, formAction] = useFormState(updateSecurityInfo, initialState);
  const [formError, setFormError] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    if (state.status === 200) {
      toast({
        title: "Success",
        description: state.message,
        type: "foreground",
      });
    } else if (state.status === 400) {
      setFormError(state.message);
      toast({
        title: "Error",
        description: state.message,
        type: "foreground",
      });
    }
  }, [state.message, state.status]);

  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>Security</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form action={formAction} className="space-y-4">
          {formError && (
            <div className="text-red-500 transition-all duration-300 ease-in-out">
              {formError}
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              name="new-password"
              placeholder="Enter your new password"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              name="confirm-password"
              placeholder="Confirm your new password"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="recovery-email">Recovery Email</Label>
            <Input
              id="recovery-email"
              type="email"
              placeholder="Enter your recovery email"
              defaultValue={data.email}
              disabled
            />
          </div>
          <SubmitButton variant="outline" pendingText="Updating...">
            Update
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};
export default UpdateSecurityInfo;