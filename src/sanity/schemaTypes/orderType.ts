// src/sanity/schemaTypes/orderType.ts
import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
  name: "orderType",
  title: "Order",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "orderId",
      title: "Razorpay order Id",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "paymentId",
      title: "Razorpay payment Id",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "signature",
      title: "Razorpay signature",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clerkUserId",
      title: "Store User ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product Bought",
              type: "reference",
              to: [{ type: "productType" }],
            }),
            defineField({
              name: "quantity",
              title: "Quantity Purchased",
              type: "number",
            }),
          ],
          preview: {
            select: {
              product: "product.name",
              quantity: "quantity",
              image: "product.image",
              price: "product.price",
              currency: "product.currency",
            },
            prepare(select) {
              return {
                title: `${select.product} x ${select.quantity}`,
                subtitle: `${select.price * select.quantity}`,
                media: select.image,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "totalAmount",
      title: "Total Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "discountAmount",
      title: "Amount Discount",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "couponCode",
      title: "Coupon Used",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
    }),
    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: "name",
      amount: "totalAmount",
      currency: "currency",
      orderId: "orderId",
      email: "email",
    },
    prepare(select) {
      const orderIdSnippet = `${select.orderId.slice(
        0,
        5
      )}...${select.orderId.slice(-5)}`;
      return {
        title: `${select.name} (${orderIdSnippet})`,
        subtitle: `${select.amount} ${select.currency}, ${select.email}`,
        media: BasketIcon,
      };
    },
  },
});
