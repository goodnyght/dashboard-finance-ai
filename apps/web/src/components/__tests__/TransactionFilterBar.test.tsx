import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TransactionFilterBar from "../TransactionFilterBar";

describe("TransactionFilterBar", () => {
    it("renders all filter options", () => {
        render(<TransactionFilterBar />);

        expect(screen.getByText("Last 30 Days")).toBeInTheDocument();
        expect(screen.getByText("All Categories")).toBeInTheDocument();
        expect(screen.getByText("All Types")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Search in content...")).toBeInTheDocument();
    });

    it("renders search input correctly", () => {
        render(<TransactionFilterBar />);
        const searchInput = screen.getByPlaceholderText("Search in content...");
        expect(searchInput).toHaveAttribute("type", "text");
    });
});
