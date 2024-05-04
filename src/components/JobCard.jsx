import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Link,
  Button,Box
} from "@mui/material";

const typographyStyles = {
  h3: {
    fontSize: "0.9rem",
    fontWeight: 600,
    marginBottom: "3px",
    color: "#8b8b8b",
  },
  h2: {
    fontSize: "1rem",
    lineHeight: "1.5",
    textTransform: "capitalize",
  },
};

export default function JobCard({ job }) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        borderRadius: "1.5rem",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
        padding: "3px",
        width: "100%",
        "&:hover": {
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
          },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <Grid container sx={{ marginBottom: "0.5rem" }}>
          {/* logo  */}
          <Grid item xs={1.8}>
            <img
              src={job.logoUrl}
              alt="Company Logo"
              style={{ width: "2rem" }}
            />
          </Grid>
          {/* company header details */}
          <Grid item xs={5}>
            <Link
              href={job.jdLink}
              target="_blank"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                  textDecorationColor: "#8b8b8b",
                },
              }}
            >
              <Typography variant="h3" component="h3" sx={typographyStyles.h3}>
                {job.companyName}
              </Typography>
            </Link>
            <Typography variant="h2" component="h2" sx={typographyStyles.h2}>
              {job.jobRole}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textTransform: "capitalize",
                fontSize: "0.8rem",
                fontWeight: "500",
              }}
            >
              {job.location}
            </Typography>
          </Grid>
        </Grid>
        {/* salary */}
        {(job.salaryCurrencyCode && job.minJdSalary && job.maxJdSalary) ? (
          <Typography variant="p">
            Estimated Salary: {job.salaryCurrencyCode}
            {job.minJdSalary} - {job.maxJdSalary}
          </Typography>
        ) : <Box sx={{height: '20px'}}></Box>}
        {/* About Role */}
        <Typography
          variant="body1"
          component="div"
          style={{ whiteSpace: "pre-wrap", maxHeight: '30%' }}
        >
          <p>Job description:</p>
          {expanded ? (
            <p>{job.jobDetailsFromCompany}</p>
          ) : (
            <p>{job.jobDetailsFromCompany.slice(0, 200)}...</p>
          )}
          <Grid container justifyContent="center">
            <Button onClick={toggleExpand} color="primary">
              {expanded ? "Read less" : "View Job"}
            </Button>
          </Grid>
        </Typography>
        {/* Minimum experience */}
            {
                job.minExp ? <Box sx={{height: '2.5rem'}}><Typography  variant="h3" component="h3" sx={typographyStyles.h3}>
                Minimum Experience
              </Typography>
              <Typography variant="p">{job.minExp} years</Typography></Box> :  <Box sx={{height: '2.5rem'}}></Box>
            }
        <Button
          variant="contained"
          sx={{
            background: "rgb(85, 239, 196)",
            color: "black",
            padding:'8px 18px',
            fontWeight: '500',
            marginTop: '1rem',
            boxShadow: 'none',
            "&:hover": {
                background: "rgb(85, 239, 196)",boxShadow: 'none',
              },
          }}
        >
          Easy Apply
        </Button>
      </CardContent>
    </Card>
  );
}
