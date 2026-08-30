import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { prisma } from "@/prisma/prisma-client"

export default async function AdminUsersPage() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    })

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#1A1A1A]">
                    Users
                </h1>
                <p className="mt-1 text-sm text-[#546E7A]">
                    View registered accounts in the system.
                </p>
            </div>

            <Card className="border-white/40 bg-white/50 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <CardTitle>All users</CardTitle>
                            <CardDescription>
                                {users.length} registered user
                                {users.length === 1 ? "" : "s"}
                            </CardDescription>
                        </div>
                        <Badge variant="secondary">{users.length}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    {users.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
                            <p className="text-sm font-medium text-[#1A1A1A]">
                                No users yet
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Users will appear here after they sign up.
                            </p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Joined</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">
                                            {user.name || "—"}
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {user.createdAt.toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
