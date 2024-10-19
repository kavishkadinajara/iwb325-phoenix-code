/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import SubmitButton from "./SubmitButton";
import { useToast } from "@/hooks/use-toast";
import { useFormState } from "react-dom";
import { updateGeneralInfo } from "@/actions/Settings";

const UpdateGeneralInfo = ({ data }: { data: any }) => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [fileInputValue, setFileInputValue] = useState<string>("");

  const initialState = {
    message: "",
    status: 0,
  };

  const [state, formAction] = useFormState(updateGeneralInfo, initialState);

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
  }, [state.message, state.status]);

  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form action={formAction} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              name="name"
              defaultValue={data.full_name}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              name="email"
              type="email"
              value={data.email}
              readOnly
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              name="phone"
              defaultValue={data.mobile}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="profile-picture">Profile Picture</Label>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Avatar className="h-20 w-20">
                {profileImage ? (
                  <AvatarImage
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile Picture"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        data.avatar_url || "/default-avatar.png";
                    }}
                  />
                ) : data.avatar_url ? (
                  <AvatarImage src={data.avatar_url} alt="Profile Picture" />
                ) : (
                  <AvatarFallback>
                    {data.full_name ? data.full_name[0] : "U"}
                  </AvatarFallback>
                )}
              </Avatar>
              {/* Remove button */}
              {profileImage && (
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => {
                    setProfileImage(null);
                    setFileInputValue("");
                  }}
                >
                  Remove
                </Button>
              )}

              <Input
                id="profile-picture"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                name="profile-picture"
                className="w-3/4 md:w-1/3 md:ml-5"
                value={fileInputValue}
                onChange={(e) => {
                  const file = e.target?.files?.[0];
                  if (file) {
                    if (file.size > MAX_FILE_SIZE) {
                      alert("File size exceeds the 5MB limit.");
                      setProfileImage(null);
                      setFileInputValue("");
                    } else {
                      setProfileImage(file);
                      setFileInputValue(e.target.value);
                    }
                  }
                }}
              />
            </div>
          </div>
          {/* <Button variant="outline">Change</Button> */}
          <SubmitButton variant="outline" pendingText="Updating...">
            Change
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};
export default UpdateGeneralInfo;