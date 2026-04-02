import z from "zod";

const AddWatchListSchema = z.object({
movieId: z.string().uuid(),
status: z.enum(["PLANNED", "WATCHING", "COMPLETED", "PAUSED"], {
message: "Status must be one of PLANNED, WATCHING, COMPLETED, or PAUSED",
}),
rating: z.coerce.number().int().min(1, "Rating must be between 1 and 10").max(10 , "Rating must be between 1 and 10").optional(),
notes: z.string().optional(),
});

const UpdateWatchListItemSchema = z.object({
status: z.enum(["PLANNED", "WATCHING", "COMPLETED", "PAUSED"], {
message: "Status must be one of PLANNED, WATCHING, COMPLETED, or PAUSED",
}).optional(),
rating: z.coerce.number().int().min(1, "Rating must be between 1 and 10").max(10 , "Rating must be between 1 and 10").optional(),
notes: z.string().optional(),
});

export { AddWatchListSchema , UpdateWatchListItemSchema };