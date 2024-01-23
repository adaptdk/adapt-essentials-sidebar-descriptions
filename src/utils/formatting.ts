type TypeDateOptions = {
  localeMatcher?: `best fit` | `lookup`;
  weekday?: `long` | `short` | `narrow`;
  era?: `long` | `short` | `narrow`;
  year?: `numeric` | `2-digit`;
  month?: `numeric` | `2-digit` | `long` | `short` | `narrow`;
  day?: `numeric` | `2-digit`;
  hour?: `numeric` | `2-digit`;
  minute?: `numeric` | `2-digit`;
  second?: `numeric` | `2-digit`;
  timeZoneName?: `short` | `long`;
  formatMatcher?: `best fit` | `basic`;
  hour12?: boolean;
  timeZone?: string;
};

export const formatDate = (
  dateString: string,
  dateOptions?: TypeDateOptions,
) => {
  if (!dateString) return null;

  const date = new Date(dateString);
  const options = dateOptions || {
    year: `numeric`,
    month: `long`,
    day: `numeric`,
  };

  return date.toLocaleDateString(`en-US`, options);
};
