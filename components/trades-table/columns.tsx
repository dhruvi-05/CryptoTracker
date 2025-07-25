"use client";

import Image from "next/image";
import { formatDollar } from "@/utils/crypto-utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Trade = {
  id: string;
  amount: number;
  symbol: string;
  image: string;
  name: string;
  date: Date;
  value: number;
  type: string;
};

export const columns: ColumnDef<Trade>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col md:flex-row items-center md:gap-3 flex-wrap">
          <Image
            src={row.original.image}
            alt={row.getValue("name")}
            width={40}
            height={40}
            objectFit="cover"
            className="rounded-full"
          />
          <div className="flex flex-col md:flex-row md:items-center mt-2 md:mt-0">
            <p className="text-base text-foreground font-bold md:mr-2">
              {row.getValue("name")}
            </p>
            <p className="text-base text-muted-foreground">
              {row.original.symbol.toUpperCase()}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <div className="text-base">Date</div>{" "}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const dateTime: Date = new Date(row.getValue("date"));
      return (
        <div className="text-right text-base mr-4">
          {dateTime.toISOString().split("T")[0]}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <div className="text-base">Type</div>{" "}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const transactionType = row.getValue("type");
      return (
        <div
          className={
            transactionType === "Sell"
              ? "text-right text-base text-red-600 mr-4"
              : "text-right text-base text-green-600 mr-4"
          }
        >
          {transactionType}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <div className="text-base">Amount</div>{" "}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      return <div className="text-right text-base mr-4">{amount}</div>;
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <div className="text-base">Value</div>{" "}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const total = parseFloat(row.getValue("value"));
      return (
        <div className="text-right text-base mr-4">
          {formatDollar(total, 2)}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const tradeData = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => table.options?.meta?.editTrade(tradeData._id)}
            >
              <div className="w-full flex flex-wrap justify-between ">
                <p>Edit </p>
                <Pencil className="w-4 h-4 ml-2" />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => table.options?.meta?.deleteTrade(tradeData._id)}
            >
              <div className="w-full flex flex-wrap justify-between ">
                <p>Delete </p>
                <Trash2 className="w-4 h-4 ml-2" />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
