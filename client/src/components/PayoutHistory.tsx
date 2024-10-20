import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

type Payout = {
  id: string;
  user_id: string;
  receipt_url: string;
  amount: number;
  created_at: string;
};

const PayoutHistory = async () => {
  const data: Payout[] = []; // Replace this with actual data fetching logic

  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>Billing Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="payout-history">Payout History</Label>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((payout: Payout) => (
                <TableRow key={payout.id}>
                  <TableCell>
                    {new Date(payout.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "LKR",
                    }).format(payout.amount)}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={payout.receipt_url}
                      target="_blank"
                      className="text-blue-600 underline"
                      prefetch={false}
                    >
                      View Receipt
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
export default PayoutHistory;