"use client"

import { useCallback, useState } from "react"
import { Pencil, Plus, Trash2 } from "lucide-react"

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { ProductCreateForm } from "./product-create-form"

type Product = {
    id: string
    name: string
    description: string | null
    price: number
    createdAt: string | Date
    updatedAt: string | Date
}

function formatPrice(cents: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(cents / 100)
}

type ProductManagerProps = {
    initialProducts: Product[]
}

export function ProductManager({ initialProducts }: ProductManagerProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [productToDelete, setProductToDelete] = useState<Product | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const fetchProducts = useCallback(async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch("/api/product")
            if (!response.ok) {
                throw new Error("Failed to load products")
            }
            const data = (await response.json()) as Product[]
            setProducts(data)
        } catch (fetchError) {
            setError(
                fetchError instanceof Error
                    ? fetchError.message
                    : "Failed to load products"
            )
        } finally {
            setIsLoading(false)
        }
    }, [])

    const handleEdit = async (id: string) => {
        setError(null)

        try {
            const response = await fetch(`/api/product?id=${id}`)
            if (!response.ok) {
                throw new Error("Failed to load product")
            }
            const product = (await response.json()) as Product
            setEditingProduct(product)
        } catch (editError) {
            setError(
                editError instanceof Error
                    ? editError.message
                    : "Failed to load product"
            )
        }
    }

    const confirmDelete = async () => {
        if (!productToDelete) {
            return
        }

        setIsDeleting(true)
        setError(null)

        try {
            const response = await fetch(`/api/product?id=${productToDelete.id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error("Failed to delete product")
            }

            if (editingProduct?.id === productToDelete.id) {
                setEditingProduct(null)
            }

            setProductToDelete(null)
            await fetchProducts()
        } catch (deleteError) {
            setError(
                deleteError instanceof Error
                    ? deleteError.message
                    : "Failed to delete product"
            )
        } finally {
            setIsDeleting(false)
        }
    }

    const handleFormSuccess = async () => {
        setEditingProduct(null)
        await fetchProducts()
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#1A1A1A]">
                    Products
                </h1>
                <p className="mt-1 text-sm text-[#546E7A]">
                    Manage your product catalog, pricing, and descriptions.
                </p>
            </div>

            {error && (
                <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive">
                    {error}
                </p>
            )}

            <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
                <Card className="h-fit border-white/40 bg-white/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {editingProduct ? (
                                <>
                                    <Pencil className="size-4" />
                                    Edit product
                                </>
                            ) : (
                                <>
                                    <Plus className="size-4" />
                                    Add product
                                </>
                            )}
                        </CardTitle>
                        <CardDescription>
                            {editingProduct
                                ? "Update the selected product details."
                                : "Create a new product for the store."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ProductCreateForm
                            editingProduct={editingProduct}
                            onSuccess={handleFormSuccess}
                            onCancel={() => setEditingProduct(null)}
                        />
                    </CardContent>
                </Card>

                <Card className="border-white/40 bg-white/50 backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <CardTitle>All products</CardTitle>
                                <CardDescription>
                                    {products.length} product
                                    {products.length === 1 ? "" : "s"} in catalog
                                </CardDescription>
                            </div>
                            <Badge variant="secondary">{products.length}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <p className="text-sm text-muted-foreground">
                                Loading products...
                            </p>
                        ) : products.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
                                <p className="text-sm font-medium text-[#1A1A1A]">
                                    No products yet
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Add your first product using the form.
                                </p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell className="font-medium">
                                                {product.name}
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate text-muted-foreground">
                                                {product.description || "—"}
                                            </TableCell>
                                            <TableCell>
                                                {formatPrice(product.price)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            void handleEdit(product.id)
                                                        }
                                                    >
                                                        <Pencil className="size-3.5" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() =>
                                                            setProductToDelete(product)
                                                        }
                                                    >
                                                        <Trash2 className="size-3.5" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>

            <AlertDialog
                open={productToDelete !== null}
                onOpenChange={(open) => {
                    if (!open && !isDeleting) {
                        setProductToDelete(null)
                    }
                }}
            >
                <AlertDialogContent className="border-white/40 bg-white/95 backdrop-blur-sm">
                    <AlertDialogHeader>
                        <AlertDialogMedia className="bg-destructive/10 text-destructive">
                            <Trash2 />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Delete product?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently remove{" "}
                            <span className="font-medium text-foreground">
                                {productToDelete?.name}
                            </span>{" "}
                            from your catalog. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>
                            Cancel
                        </AlertDialogCancel>
                        <Button
                            type="button"
                            variant="destructive"
                            disabled={isDeleting}
                            onClick={() => void confirmDelete()}
                        >
                            {isDeleting ? "Deleting..." : "Delete product"}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
