import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";

async function getContacts() {
  try {
    return await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return [];
  }
}

export default async function AdminContactsPage() {
  await requireAdmin();

  const contacts = await getContacts();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          View all messages received from the contact form
        </p>
      </div>

      <div className="grid gap-4">
        {contacts.length === 0 ? (
          <Card className="p-8 text-center">
            <Mail className="mx-auto size-12 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">
              No messages yet
            </p>
          </Card>
        ) : (
          contacts.map((contact) => (
            <Card key={contact.id} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                      <Mail className="size-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {contact.email}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg bg-muted/50 p-4">
                    <p className="text-sm leading-relaxed">{contact.message}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(contact.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        {contacts.length} message{contacts.length !== 1 ? "s" : ""} total
      </div>
    </div>
  );
}
