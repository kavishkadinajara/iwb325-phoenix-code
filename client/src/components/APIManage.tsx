"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FaCopy, FaEye, FaEyeSlash, FaTrash } from "react-icons/fa6";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { randomBytes } from "crypto";
// import { deleteApiKey, generateApiKey } from "@/actions/Settings";

type ApiKey = {
  key: string;
};

export const dynamic = "force-dynamic";

const APIManage = ({ data }: { data: ApiKey[] }) => {
  const { toast } = useToast();

  const [apiKeys, setApiKeys] = useState<ApiKey[]>(data);
  const [isGenerating, setIsGenerating] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<{ [key: number]: boolean }>({});

  const handleDelete = async (key: string) => {
    // // const { status, message } = await deleteApiKey(key);
    // if (status === 400) {
    //   throw new Error(message);
    // }

    setApiKeys(apiKeys.filter((apiKey) => apiKey.key !== key));
    toast({
      title: "Deleted",
      description: "API Key deleted successfully",
      type: "foreground",
    });
  };

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "Copied",
      description: "API Key copied to clipboard",
      type: "foreground",
    });
  };

  const toggleVisibility = (index: number) => {
    setVisibleKeys(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleGenerateNewKey = async () => {
    try {
      setIsGenerating(true);
    //   const { status, message } = await generateApiKey();
    //   if (status === 200) {
    //     setApiKeys([...apiKeys, { key: message }]);
    //   }

    //   if (status === 400) {
    //     throw new Error(message);
    //   }
    //   toast({
    //     title: "New Key Generated",
    //     description: "A new API key has been generated",
    //     type: "foreground",
    //   });
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to generate and save the new API key.",
    //     type: "foreground",
    //   });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>API Keys</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {apiKeys.map((apiKey, index) => (
          <div key={index} className="grid gap-2">
            <div className="flex items-center gap-2">
              <Input
                id={`api-key-${index}`}
                type="text"
                name={`api-key-${index}`}
                placeholder="Your API Key"
                value={visibleKeys[index] ? apiKey.key : `${apiKey.key.slice(0, 4)}...${apiKey.key.slice(-4)}`}
                disabled
              />
              <Button
                variant="outline"
                type="button"
                onClick={() => toggleVisibility(index)}
              >
                {visibleKeys[index] ? <FaEyeSlash /> : <FaEye />}
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => handleCopy(apiKey.key)}
              >
                <FaCopy />
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => handleDelete(apiKey.key)}
              >
                <FaTrash />
              </Button>
            </div>
          </div>
        ))}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleGenerateNewKey}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate New Key"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default APIManage;
