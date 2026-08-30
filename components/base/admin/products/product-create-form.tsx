"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    productCreateFormSchema,
    type ProductCreateFormSchema,
} from "./product-create-form.schema"

type Product = {
    id: string
    name: string
    description: string | null
    price: number
}

type ProductCreateFormProps = {
    editingProduct?: Product | null
    onSuccess: () => void
    onCancel?: () => void
}

export function ProductCreateForm({
    editingProduct,
    onSuccess,
    onCancel,
}: ProductCreateFormProps) {
    const [submitError, setSubmitError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProductCreateFormSchema>({
        resolver: zodResolver(productCreateFormSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
        },
    })

    useEffect(() => {
        if (editingProduct) {
            reset({
                name: editingProduct.name,
                description: editingProduct.description ?? "",
                price: (editingProduct.price / 100).toFixed(2),
            })
            return
        }

        reset({
            name: "",
            description: "",
            price: "",
        })
    }, [editingProduct, reset])

    const onSubmit = async (data: ProductCreateFormSchema) => {
        setSubmitError(null)

        const payload = {
            name: data.name,
            description: data.description || null,
            price: Math.round(Number(data.price) * 100),
        }

        try {
            const response = await fetch("/api/product", {
                method: editingProduct ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    editingProduct ? { id: editingProduct.id, ...payload } : payload
                ),
            })

            if (!response.ok) {
                throw new Error(
                    editingProduct
                        ? "Failed to update product"
                        : "Failed to create product"
                )
            }

            reset({ name: "", description: "", price: "" })
            onSuccess()
        } catch (error) {
            setSubmitError(
                error instanceof Error ? error.message : "Something went wrong"
            )
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="product-name">Name</FieldLabel>
                    <Input
                        id="product-name"
                        {...register("name")}
                        placeholder="E-scooter Pro"
                    />
                    {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                </Field>
                <Field>
                    <FieldLabel htmlFor="product-price">Price (USD)</FieldLabel>
                    <Input
                        id="product-price"
                        type="number"
                        min="0"
                        step="0.01"
                        {...register("price")}
                        placeholder="999.00"
                    />
                    {errors.price && (
                        <p className="text-sm text-destructive">{errors.price.message}</p>
                    )}
                </Field>
                <Field>
                    <FieldLabel htmlFor="product-description">Description</FieldLabel>
                    <Textarea
                        id="product-description"
                        {...register("description")}
                        placeholder="Short product description"
                        rows={4}
                    />
                    {errors.description && (
                        <p className="text-sm text-destructive">
                            {errors.description.message}
                        </p>
                    )}
                </Field>
                {submitError && (
                    <p className="text-sm text-destructive">{submitError}</p>
                )}
                <div className="flex gap-2">
                    <Button
                        type="submit"
                        variant="authPrimary"
                        className="flex-1"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Saving..."
                            : editingProduct
                              ? "Update product"
                              : "Create product"}
                    </Button>
                    {editingProduct && onCancel && (
                        <Button type="button" variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                    )}
                </div>
            </FieldGroup>
        </form>
    )
}
