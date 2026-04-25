"use client";

import { useEffect, useRef, useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Html5Qrcode } from "html5-qrcode";
import { useRouter } from "next/navigation";

interface QrScannerProps {
  open: boolean;
  onClose: () => void;
}

const QrScanner = ({ open, onClose }: QrScannerProps) => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isRunningRef = useRef(false);

  useEffect(() => {
    if (!open) return;

    let mounted = true;

    const startScanner = async () => {
      try {
        setError("");
        const scanner = new Html5Qrcode("qr-reader");
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            if (!mounted) return;
            handleScanSuccess(decodedText);
          },
          () => {
            // QR code not found in frame — ignore
          }
        );
        isRunningRef.current = true;
      } catch (err: any) {
        if (mounted) {
          setError(
            "Kamera konnte nicht geöffnet werden. Bitte erlauben Sie den Kamerazugriff."
          );
        }
      }
    };

    // Small delay to let the Dialog DOM render
    const timeout = setTimeout(startScanner, 500);

    return () => {
      mounted = false;
      clearTimeout(timeout);
      stopScanner();
    };
  }, [open]);

  const stopScanner = async () => {
    if (scannerRef.current && isRunningRef.current) {
      try {
        await scannerRef.current.stop();
        isRunningRef.current = false;
      } catch {
        // Scanner might already be stopped
      }
    }
  };

  const handleScanSuccess = (decodedText: string) => {
    stopScanner();

    try {
      // Extract path from full URL or use as-is if it's a relative path
      let path = decodedText;
      if (decodedText.startsWith("http")) {
        const url = new URL(decodedText);
        path = url.pathname;
      }

      onClose();
      router.push(path);
    } catch {
      // If URL parsing fails, try using the text directly
      onClose();
      router.push(decodedText);
    }
  };

  const handleClose = () => {
    stopScanner();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0096A4",
          color: "#fff",
          py: 1.5,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          QR-Code scannen
        </Typography>
        <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Stack alignItems="center" sx={{ py: 3, px: 2 }}>
          <Box
            id="qr-reader"
            sx={{
              width: "100%",
              maxWidth: 400,
              "& video": {
                borderRadius: "12px",
              },
            }}
          />
          {error && (
            <Typography
              color="error"
              sx={{ mt: 2, textAlign: "center", fontSize: "14px" }}
            >
              {error}
            </Typography>
          )}
          <Typography
            sx={{
              mt: 2,
              color: "#646464",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            Halten Sie den QR-Code vor die Kamera
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default QrScanner;
