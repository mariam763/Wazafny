import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobs = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="bg-gradient-to-br from-[#3d005e] to-[#6a0dad] p-6 rounded-2xl shadow-lg">
      <Table className="w-full text-white">
        <TableCaption className="text-gray-300">
          A list of your applied jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-white text-black px-4 py-2 rounded-tl-lg">
              Date
            </TableHead>
            <TableHead className="bg-white text-black px-4 py-2">
              Job Role
            </TableHead>
            <TableHead className="bg-white text-black px-4 py-2">
              Company
            </TableHead>
            <TableHead className="text-right bg-white text-black px-4 py-2 rounded-tr-lg">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-300 py-4">
                You haven't applied for any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => {
              const status = appliedJob?.status?.toLowerCase();
              const badgeColor =
                status === "accepted"
                  ? "bg-green-500"
                  : status === "rejected"
                  ? "bg-red-500"
                  : "bg-gray-500";

              return (
                <TableRow
                  key={appliedJob._id}
                  className="hover:bg-[#550080] transition"
                >
                  <TableCell className="text-gray-200">
                    {appliedJob?.createdAt?.split("T")[0]}
                  </TableCell>
                  <TableCell className="text-gray-200">
                    {appliedJob?.job?.title}
                  </TableCell>
                  <TableCell className="text-gray-200">
                    {appliedJob?.job?.company?.name}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={`${badgeColor} px-3 py-1 rounded-md shadow-md`}
                    >
                      {status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobs;
