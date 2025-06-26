"use client";
import React, { useMemo, useState } from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useUserData } from "@/context/UserContext";
import type { Project } from "@/lib/db/db.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { ExternalLink, SquareArrowOutUpRightIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { SessionTable } from "@/components/session-table/session-table";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function Project() {
  const { id } = useParams();

  const { projects } = useUserData();

  const rowsPerPage = 3;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  const data: Project | undefined = useMemo(() => {
    const project = projects.find((project) => project.id === id);
    return project
      ? { ...project, sessions: [...project.sessions].reverse() }
      : undefined;
  }, [projects, id]);
  console.log(data?.sessions);

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 py-4 px-20 pt-0">
        <div className="container mx-auto">
          <h3 className="scroll-m-20 text-xl mb-4 font-semibold tracking-tight">
            Project Details
          </h3>
          <Card className="w-full">
            <CardHeader>
              <CardDescription>project id : {data?.id}</CardDescription>
              <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {data?.name}
              </CardTitle>
              <CardAction className="h-14">
                <Avatar className="rounded-lg w-16 h-16">
                  <AvatarImage src={data?.logo_url} />
                  <AvatarFallback>{getInitials(data?.name)}</AvatarFallback>
                </Avatar>
              </CardAction>
            </CardHeader>
            <CardFooter className=" gap-10 text-sm">
              <div>
                <div className="w-24 text-muted-foreground  gap-2">Model</div>
                <div className=" flex gap-2 text-lg font-medium">
                  {data?.model}
                </div>
              </div>
              <div>
                <div className="w-24 text-muted-foreground gap-2">
                  Data File
                </div>
                <div className="flex gap-2 text-lg font-medium">
                  <Link
                    href={data?.data_url || "#"}
                    target="_blank"
                    className="flex justify-center items-center"
                  >
                    <Button variant={"link"} className="text-lg p-0 m-0">
                      File
                      <ExternalLink className="h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div>
                <div className="w-24 text-muted-foreground gap-2">Website</div>
                <div className="flex gap-2 text-lg font-medium">
                  {data?.website_url || "-"}
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="container mx-auto">
          <h3 className="scroll-m-20 text-xl mb-4 font-semibold tracking-tight">
            User Interactions
          </h3>
          <div className="flex flex-col gap-5">
            {data && data.sessions.length > 0
              ? data.sessions
                  .slice(startIndex, endIndex)
                  .map(({ txId, question, answer }) => (
                    <Card className="relative w-full gap-1" key={txId}>
                      <CardHeader>
                        <h3 className=" m-0 p-0">{question}</h3>
                        <CardAction className="">
                          <Link
                            href={`https://sepolia.basescan.org/tx/${txId}`}
                            target="_blank"
                            className="absolute top-4 right-4"
                          >
                            <Button variant="ghost" className="w-4">
                              <SquareArrowOutUpRightIcon />
                            </Button>
                          </Link>
                        </CardAction>
                      </CardHeader>
                      <CardFooter>
                        <p className="text-muted-foreground text-sm m-0 p-0">
                          {answer}
                        </p>
                      </CardFooter>
                    </Card>
                  ))
              : "No Sessions"}{" "}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={
                      startIndex === 0
                        ? "pointer-events-none opacity-50"
                        : undefined
                    }
                    onClick={() => {
                      setStartIndex(startIndex - rowsPerPage);
                      setEndIndex(endIndex - rowsPerPage);
                    }}
                  />
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    className={
                      endIndex === 100
                        ? "pointer-events-none opacity-50"
                        : undefined
                    }
                    onClick={() => {
                      setStartIndex(startIndex + rowsPerPage); //10
                      setEndIndex(endIndex + rowsPerPage); //10 + 10 = 20
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
}
