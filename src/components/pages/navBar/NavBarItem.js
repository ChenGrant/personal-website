import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import InternalLink from "../../shared/InternalLink";
import { keyframes } from "@emotion/react";
import useScreenSize from "../../../hooks/useScreenSize";

const grow = keyframes({ from: { width: "0%" }, to: { width: "100%" } });

const shrink = keyframes({ from: { width: "100%" }, to: { width: "0%" } });

const resumeSrc =
  "https://firebasestorage.googleapis.com/v0/b/personal-website-dc932.appspot.com/o/resume%2FGrant%20Chen%20Resume.pdf?alt=media&token=0071bcf6-6921-4735-a183-cfb0c9cd639e";

const NavBarItem = ({ children, link, resume, closeMenu }) => {
  const [navBarItemIsHovered, setNavBarItemIsHovered] = useState(false);
  const [hoveredAtLeastOnce, setHoveredAtLeastOnce] = useState(false);
  const { desktop } = useScreenSize();

  const openResumeInNewTab = () => window.open(resumeSrc);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={desktop ? 1.5 : "16px"}
    >
      <InternalLink link={link}>
        <Typography
          sx={{ "&:hover": { cursor: "pointer" } }}
          py={0.5}
          fontWeight="bold"
          color="secondary"
          textAlign="center"
          onMouseEnter={() => {
            setNavBarItemIsHovered(true);
            setHoveredAtLeastOnce(true);
          }}
          onMouseLeave={() => setNavBarItemIsHovered(false)}
          onClick={() => {
            resume && openResumeInNewTab();
            !desktop && closeMenu();
          }}
        >
          {children}
        </Typography>
      </InternalLink>
      <Box width="100%">
        <Box
          height="5px"
          bgcolor="tertiary.main"
          borderRadius="5px"
          width={navBarItemIsHovered ? "100%" : "0%"}
          sx={{
            animation: navBarItemIsHovered
              ? `${grow} 0.4s ease`
              : hoveredAtLeastOnce && `${shrink} 0.2s ease`,
          }}
        />
      </Box>
    </Box>
  );
};

export default NavBarItem;
