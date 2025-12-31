/**
 * UI components configuration file
 * Used to centralize static content and configuration for UI components
 */

/**
 * Hero section configuration (P01_toppage)
 */
export const HERO_CONFIG = {
    /** Title text shown in the hero section */
    title: "OpuCoder 技術ブログ",
    /** Description text shown below the title */
    description: "ゲーム開発・AI・ロボット・インフラなど、技術系活動の成果を発信します。",
    /** Background image URL for the hero section */
    backgroundImageUrl: "https://images.unsplash.com/photo-1683813479742-4730f91fa3ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29kaW5nJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2NDQ3NjM1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    /** Primary button text */
    primaryButtonText: "プロジェクト記事を見る",
    /** Primary button destination */
    primaryButtonPref: "/project",
    /** Secondary button text */
    secondaryButtonText: "最新記事一覧",
    /** Secondary button destination */
    secondaryButtonPref: "/search",
};

/**
 * About section configuration (P01_toppage)
 */
export const ABOUT_CONFIG = {
    /** Section title */
    title: "OpuCoderとは？",
    /** 
     * Paragraphs of text to display in the about section.
     * Each string in the array represents a separate paragraph.
     */
    paragraphs: [
        "岡山県立大学の技術サークル「Opu Coder」は、ゲーム開発、AI、ロボティクス、ウェブ開発など、様々な技術分野に取り組む学生たちのコミュニティです。",
        "このブログでは、メンバーが取り組んでいるプロジェクトの進捗や、学んだ技術のTipsなどを共有しています。"
    ]
};
