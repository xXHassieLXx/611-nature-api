export interface AIAnalyze {
    topPlace: TopPlace;
    topTrail: TopTrail;
    accessibilityReport: AccessibilityReport;
    categorySummary: CategorySummary[];
    patterns: string[];
}

export interface TopPlace {
    name: string;
    reason: string;
}

export interface TopTrail {
    name: string;
    difficulty: string;
    distanceKm: number;
}

export interface AccessibilityReport {
    totalAccessible: number;
    percentageAccessible: number;
}

export interface CategorySummary {
    category: string;
    count: number;
}