import { Modal, Box, Typography, CircularProgress } from "@mui/material";

import { WifiOff, ShieldCheck, Clock3 } from "lucide-react";

interface NetworkDisconnectedModalProps {
  open: boolean;
}

function NetworkDisconnectedModal({ open }: NetworkDisconnectedModalProps) {
  return (
    <Modal
      open={open}
      disableAutoFocus
      disableEnforceFocus
      slotProps={{
        backdrop: {
          timeout: 300,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",

          top: "50%",
          left: "50%",

          transform: "translate(-50%, -50%)",

          width: "90%",
          maxWidth: 520,

          outline: "none",
        }}
      >
        {/* =====================================================
            MAIN CARD
        ====================================================== */}

        <Box
          sx={{
            overflow: "hidden",

            borderRadius: 5,

            bgcolor: "#ffffff",

            boxShadow: "0 25px 80px rgba(15, 23, 42, 0.25)",

            border: "1px solid rgba(226, 232, 240, 0.9)",
          }}
        >
          {/* ===================================================
              TOP ACCENT
          ====================================================== */}

          <Box
            sx={{
              height: 5,

              background: "linear-gradient(90deg, #dc2626, #f97316)",
            }}
          />

          <Box
            sx={{
              px: {
                xs: 3,
                sm: 5,
              },

              py: {
                xs: 4,
                sm: 5,
              },

              textAlign: "center",
            }}
          >
            {/* =================================================
                ICON AREA
            ====================================================== */}

            <Box
              sx={{
                position: "relative",

                display: "inline-flex",

                alignItems: "center",

                justifyContent: "center",

                width: 96,

                height: 96,

                borderRadius: "50%",

                bgcolor: "#fff1f2",

                mb: 3,
              }}
            >
              {/* Animated outer ring */}

              <CircularProgress
                size={96}
                thickness={2}
                sx={{
                  position: "absolute",

                  color: "#fecdd3",
                }}
              />

              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  width: 62,

                  height: 62,

                  borderRadius: "50%",

                  bgcolor: "#fee2e2",

                  color: "#dc2626",
                }}
              >
                <WifiOff size={30} />
              </Box>
            </Box>

            {/* =================================================
                STATUS LABEL
            ====================================================== */}

            <Box
              sx={{
                display: "inline-flex",

                alignItems: "center",

                gap: 1,

                px: 2,

                py: 0.75,

                borderRadius: 99,

                bgcolor: "#fff7ed",

                color: "#c2410c",

                mb: 2.5,
              }}
            >
              <Box
                sx={{
                  width: 7,

                  height: 7,

                  borderRadius: "50%",

                  bgcolor: "#f97316",
                }}
              />

              <Typography
                sx={{
                  fontSize: 11,

                  fontWeight: 700,

                  letterSpacing: 1,

                  textTransform: "uppercase",
                }}
              >
                Connection Interrupted
              </Typography>
            </Box>

            {/* =================================================
                TITLE
            ====================================================== */}

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,

                color: "#0f172a",

                letterSpacing: "-0.03em",

                fontSize: {
                  xs: "1.7rem",
                  sm: "2rem",
                },
              }}
            >
              Network Connection Lost
            </Typography>

            {/* =================================================
                DESCRIPTION
            ====================================================== */}

            <Typography
              sx={{
                mt: 2,

                maxWidth: 420,

                mx: "auto",

                color: "#64748b",

                fontSize: {
                  xs: 14,
                  sm: 15,
                },

                lineHeight: 1.7,
              }}
            >
              Your connection to the JAMB Test examination server has been
              temporarily interrupted.
            </Typography>

            {/* =================================================
                PAUSED NOTICE
            ====================================================== */}

            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                gap: 2,

                mt: 4,

                p: 2.5,

                textAlign: "left",

                borderRadius: 3,

                bgcolor: "#f8fafc",

                border: "1px solid #e2e8f0",
              }}
            >
              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  width: 42,

                  height: 42,

                  borderRadius: 2,

                  bgcolor: "#ffffff",

                  border: "1px solid #e2e8f0",

                  color: "#2563eb",

                  flexShrink: 0,
                }}
              >
                <Clock3 size={19} />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: 13,

                    fontWeight: 700,

                    color: "#334155",
                  }}
                >
                  Your test timer is paused
                </Typography>

                <Typography
                  sx={{
                    mt: 0.4,

                    fontSize: 12,

                    color: "#94a3b8",

                    lineHeight: 1.5,
                  }}
                >
                  No examination time is being lost while we restore your
                  connection.
                </Typography>
              </Box>
            </Box>

            {/* =================================================
                RECONNECTION STATUS
            ====================================================== */}

            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                gap: 1.5,

                mt: 4,
              }}
            >
              <CircularProgress
                size={18}
                thickness={5}
                sx={{
                  color: "#16a34a",
                }}
              />

              <Typography
                sx={{
                  fontSize: 13,

                  fontWeight: 600,

                  color: "#16a34a",
                }}
              >
                Attempting to reconnect...
              </Typography>
            </Box>

            {/* =================================================
                SAFETY NOTICE
            ====================================================== */}

            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                gap: 1,

                mt: 3.5,
              }}
            >
              <ShieldCheck size={15} color="#94a3b8" />

              <Typography
                sx={{
                  fontSize: 11,

                  color: "#94a3b8",
                }}
              >
                Your examination session remains secure.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <Typography
          sx={{
            mt: 2,

            textAlign: "center",

            fontSize: 11,

            color: "rgba(255,255,255,0.75)",
          }}
        >
          Please do not close or refresh this window.
        </Typography>
      </Box>
    </Modal>
  );
}

export default NetworkDisconnectedModal;
