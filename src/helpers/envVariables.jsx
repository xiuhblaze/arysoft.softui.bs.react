const envVariables = () => {
  const NACECODES_OPTIONS = 'arysoft-ari-nacecodesOptions';
  const STANDARDS_OPTIONS = 'arysoft-ari-standardsOptions';

  return {
    ...import.meta.env,
    NACECODES_OPTIONS,
    STANDARDS_OPTIONS,
  }
};

export default envVariables;