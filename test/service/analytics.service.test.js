import { jest } from "@jest/globals";

jest.unstable_mockModule(
  "../../src/modules/analytics/analytics.repository.js",
  () => ({
    analyticsRepository: {
      getBenchmarkData: jest.fn(),
    },
  }),
);

const { analyticsRepository } = await import(
  "../../src/modules/analytics/analytics.repository.js"
);

const { analyticsService } = await import(
  "../../src/modules/analytics/analytics.service.js"
);

describe("analyticsService.getBenchmark", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns benchmark analysis", async () => {
    analyticsRepository.getBenchmarkData.mockResolvedValue([
      {
        totalCompensation: 3000000,
      },
      {
        totalCompensation: 3500000,
      },
      {
        totalCompensation: 4000000,
      },
    ]);

    const result = await analyticsService.getBenchmark({
      roleId: 1,
      levelId: 4,
      locationId: 1,
      currentCompensation: 3200000,
    });

    expect(result.market.median).toBe(3500000);

    expect(result.market.average).toBe(3500000);

    expect(result.market.sampleSize).toBe(3);

    expect(result.comparison.status).toBe(
      "FAIRLY_PAID",
    );
  });

  test("throws error when no benchmark data exists", async () => {
    analyticsRepository.getBenchmarkData.mockResolvedValue([]);

    await expect(
      analyticsService.getBenchmark({
        roleId: 1,
        levelId: 4,
        locationId: 1,
        currentCompensation: 3200000,
      }),
    ).rejects.toThrow(
      "Insufficient benchmark data",
    );
  });
});