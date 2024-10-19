/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "./SubmitButton";


import { useFormState } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import {  useEffect } from "react";
import { updateBankAccount } from "@/actions/Settings";

const UpdateBankAccount = ({profile}:{profile:any}) => {
  const initialState = {
    message: '',
    status: 0,
  }

  const [state, formAction] = useFormState(updateBankAccount, initialState)

  const { toast } = useToast();

  useEffect(() => {
    if (state.status === 200) {
      toast({
        title: "Success",
        description: state.message,
        type: "foreground",
      });
    } else if (state.status === 400) {
      toast({
        title: "Error",
        description: state.message,
        type: "foreground",
      });
    }
  }, [state.message, state.status, toast])


  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>Bank Account Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="account-name">Account Name</Label>
            <Input
              id="account-name"
              name="account-name"
              placeholder="Enter your account name as per bank"
              required
              defaultValue={profile?.bank?.account_name || ''}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bank-name">Bank Name</Label>
            <Input
              id="bank-name"
              name="bank-name"
              placeholder="Enter your bank name"
              required
              defaultValue={profile?.bank?.bank}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="account-number">Account Number</Label>
            <Input
              id="account-number"
              name="account-number"
              placeholder="Enter your account number"
              required
              defaultValue={profile?.bank?.account_number}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bank-branch">Branch</Label>
            <Input
              id="bank-branch"
              name="bank-branch"
              placeholder="Enter your bank branch"
              required
              defaultValue={profile?.bank?.branch}
            />
          </div>
          {/* <Button variant="outline">Update Account</Button> */}
          <SubmitButton variant="outline" pendingText="Updating...">
            Update Account
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};
export default UpdateBankAccount;