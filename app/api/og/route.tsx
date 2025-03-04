/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const interRegular = fetch(
  new URL("./fonts/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const interBold = fetch(
  new URL("./fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Jan de Belastingman";
    const description = searchParams.get("description") || "AI Tax Advisor";
    const locale = searchParams.get("locale") || "nl";

    const [interRegularData, interBoldData] = await Promise.all([
      interRegular,
      interBold,
    ]);

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            position: "relative",
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle at 25px 25px, #f0f0f0 2%, transparent 0%), radial-gradient(circle at 75px 75px, #f0f0f0 2%, transparent 0%)",
              backgroundSize: "100px 100px",
              opacity: 0.3,
            }}
          />

          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <img
              src={new URL("../../../public/logo-small.svg", import.meta.url).toString()}
              alt="Logo"
              width="80"
              height="80"
            />
          </div>

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "0 4rem",
              maxWidth: "80%",
            }}
          >
            <h1
              style={{
                fontSize: "60px",
                fontFamily: "Inter Bold",
                color: "#1a1a1a",
                lineHeight: 1.2,
                marginBottom: "1rem",
                textWrap: "balance" satisfies React.CSSProperties["textWrap"],
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "32px",
                fontFamily: "Inter Regular",
                color: "#4b5563",
                lineHeight: 1.4,
                textWrap: "balance" satisfies React.CSSProperties["textWrap"],
              }}
            >
              {description}
            </p>
          </div>

          {/* Footer */}
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                fontFamily: "Inter Regular",
                color: "#6b7280",
              }}
            >
              {locale === "nl" ? "Jouw AI Belastingadviseur" : "Your AI Tax Advisor"}
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter Regular",
            data: interRegularData,
          },
          {
            name: "Inter Bold",
            data: interBoldData,
          },
        ],
      }
    );
  } catch (e) {
    console.error(e);
    return new Response("Failed to generate image", { status: 500 });
  }
} 