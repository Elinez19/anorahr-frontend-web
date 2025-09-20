import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { type ColumnDef, type FilterFn } from "@tanstack/react-table";
import { RiCheckLine, RiVerifiedBadgeFill } from "@remixicon/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RowActions } from "./reusable-table";

// Contact item type (matching the original contacts table)
type Contact = {
  id: string;
  image: string;
  name: string;
  status: string;
  location: string;
  verified: boolean;
  referral: {
    name: string;
    image: string;
  };
  value: number;
  joinDate: string;
};

// Status filter function for contacts
const statusFilterFn: FilterFn<Contact> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

export const getContactColumns = (
  onEdit?: (contact: Contact) => void,
  onDelete?: (contact: Contact) => void,
  onView?: (contact: Contact) => void,
  onToggleStatus?: (contact: Contact) => void,
  onToggleVerified?: (contact: Contact) => void
): ColumnDef<Contact>[] => [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <img
          className="rounded-full"
          src={row.original.image}
          width={32}
          height={32}
          alt={row.getValue("name")}
        />
        <div className="font-medium">{row.getValue("name")}</div>
      </div>
    ),
    size: 200,
    minSize: 150,
    enableHiding: false,
  },
  {
    header: "ID",
    accessorKey: "id",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("id")}</span>
    ),
    size: 120,
    minSize: 100,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <div className="flex items-center h-full">
        <Badge
          variant="outline"
          className={cn(
            "gap-1 py-0.5 px-2 text-sm",
            row.original.status === "Inactive"
              ? "text-muted-foreground"
              : "text-primary-foreground"
          )}
        >
          {row.original.status === "Active" && (
            <RiCheckLine
              className="text-emerald-500"
              size={14}
              aria-hidden="true"
            />
          )}
          {row.original.status === "Inactive" && "- "}
          {row.original.status}
        </Badge>
      </div>
    ),
    size: 120,
    minSize: 100,
    filterFn: statusFilterFn,
  },
  {
    header: "Location",
    accessorKey: "location",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("location")}</span>
    ),
    size: 160,
    minSize: 120,
  },
  {
    header: "Verified",
    accessorKey: "verified",
    cell: ({ row }) => (
      <div>
        <span className="sr-only">
          {row.original.verified ? "Verified" : "Not Verified"}
        </span>
        <RiVerifiedBadgeFill
          size={20}
          className={cn(
            row.original.verified
              ? "fill-emerald-600"
              : "fill-muted-foreground/50"
          )}
          aria-hidden="true"
        />
      </div>
    ),
    size: 100,
    minSize: 80,
  },
  {
    header: "Referral",
    accessorKey: "referral",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <img
          className="rounded-full"
          src={row.original.referral.image}
          width={20}
          height={20}
          alt={row.original.referral.name}
        />
        <div className="text-muted-foreground">
          {row.original.referral.name}
        </div>
      </div>
    ),
    size: 160,
    minSize: 120,
  },
  {
    header: "Value",
    accessorKey: "value",
    cell: ({ row }) => {
      const value = row.getValue("value") as number;
      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex h-full w-full items-center">
                <Progress className="h-1 max-w-14" value={value} />
              </div>
            </TooltipTrigger>
            <TooltipContent align="start" sideOffset={-8}>
              <p>{value}%</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    size: 100,
    minSize: 80,
  },
  {
    header: "Join Date",
    accessorKey: "joinDate",
    cell: ({ row }) => {
      const date = new Date(row.getValue("joinDate"));
      return (
        <span className="text-muted-foreground">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      );
    },
    size: 120,
    minSize: 100,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const contact = row.original;
      const actions = [
        {
          label:
            contact.status === "Active"
              ? "Deactivate contact"
              : "Activate contact",
          onClick: () => onToggleStatus?.(contact),
        },
        {
          label: contact.verified ? "Unverify contact" : "Verify contact",
          onClick: () => onToggleVerified?.(contact),
        },
        {
          label: "Delete",
          onClick: () => onDelete?.(contact),
          variant: "destructive" as const,
        },
      ];

      return <RowActions item={contact} actions={actions} />;
    },
    size: 70,
    minSize: 60,
    enableHiding: false,
  },
];

// Export the Contact type for use in other components
export type { Contact };
