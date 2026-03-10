import { describe, it, expect, vi, beforeEach } from "vitest";
import { transactionsService } from "../transactions.service.js";
import { db } from "../../db/index.js";

// Mock the database
vi.mock("../../db/index.js", () => ({
    db: {
        select: vi.fn().mockReturnThis(),
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        offset: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        values: vi.fn().mockReturnThis(),
        returning: vi.fn().mockReturnThis(),
    },
}));

describe("transactionsService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("generateDisplayId", () => {
        it("should generate a correctly formatted display ID", async () => {
            // Setup mock return for count query
            ((db as any).where).mockResolvedValueOnce([{ count: 5 }]);

            const displayId = await transactionsService.generateDisplayId("test-org-id");

            expect(displayId).toBe("TRX-0006");
            expect((db as any).from).toHaveBeenCalled();
        });

        it("should handle padding for larger numbers", async () => {
            // Setup mock return for count query
            ((db as any).where).mockResolvedValueOnce([{ count: 999 }]);

            const displayId = await transactionsService.generateDisplayId("test-org-id");

            expect(displayId).toBe("TRX-1000");
        });
    });
});
