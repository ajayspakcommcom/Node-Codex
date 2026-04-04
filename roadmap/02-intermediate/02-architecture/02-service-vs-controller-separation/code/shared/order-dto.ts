export interface OrderDto {
  readonly id: string;
  readonly customerId: string;
  readonly itemCount: number;
  readonly totalInCents: number;
  readonly status: "pending" | "confirmed";
  readonly createdAt: string;
}
