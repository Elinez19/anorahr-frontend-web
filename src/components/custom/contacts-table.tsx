import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { RiBardLine } from "@remixicon/react";
import { ReusableTable } from "./reusable-table";
import { getContactColumns, type Contact } from "./contacts-table-columns";

export default function ContactsTable() {
  const [data, setData] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatePending, startUpdateTransition] = useTransition();

  // Fetch data from the original API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/users-02_mohkpe.json"
        );
        const contactsData = await res.json();
        setData(contactsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const handleToggleStatus = (contact: Contact) => {
    startUpdateTransition(() => {
      const updatedData = data.map((dataItem) => {
        if (dataItem.id === contact.id) {
          return {
            ...dataItem,
            status: dataItem.status === "Active" ? "Inactive" : "Active",
          };
        }
        return dataItem;
      });
      setData(updatedData);
    });
  };

  const handleToggleVerified = (contact: Contact) => {
    startUpdateTransition(() => {
      const updatedData = data.map((dataItem) => {
        if (dataItem.id === contact.id) {
          return {
            ...dataItem,
            verified: !dataItem.verified,
          };
        }
        return dataItem;
      });
      setData(updatedData);
    });
  };

  const handleDeleteContact = (contact: Contact) => {
    startUpdateTransition(() => {
      const updatedData = data.filter((dataItem) => dataItem.id !== contact.id);
      setData(updatedData);
    });
  };

  const handleDataChange = (newData: Contact[]) => {
    setData(newData);
  };

  const handleDeleteRows = (rows: Contact[]) => {
    const updatedData = data.filter(
      (contact) => !rows.some((row) => row.id === contact.id)
    );
    setData(updatedData);
  };

  const columns = getContactColumns(
    undefined, // onEdit
    handleDeleteContact,
    undefined, // onView
    handleToggleStatus,
    handleToggleVerified
  );

  const customActions = (
    <Button variant="outline">
      <RiBardLine
        className="size-5 -ms-1.5 text-muted-foreground/60"
        size={20}
        aria-hidden="true"
      />
      New Filter
    </Button>
  );

  return (
    <ReusableTable
      data={data}
      columns={columns}
      searchPlaceholder="Search by name"
      searchColumn="name"
      filterColumns={[
        {
          columnId: "status",
          label: "Status",
          options: [
            {
              value: "Active",
              label: "Active",
              count: data.filter((c) => c.status === "Active").length,
            },
            {
              value: "Inactive",
              label: "Inactive",
              count: data.filter((c) => c.status === "Inactive").length,
            },
          ],
        },
      ]}
      onDataChange={handleDataChange}
      onDeleteRows={handleDeleteRows}
      loading={isLoading}
      emptyMessage="No contacts found."
      customActions={customActions}
    />
  );
}
