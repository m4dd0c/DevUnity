// source: https://ce.judge0.com/
// rapid_ce: https://rapidapi.com/judge0-official/api/judge0-ce

import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env["VITE_JUDGE_CE_BASE_URL"],
  headers: {
    "x-rapidapi-key": import.meta.env["VITE_JUDGE_CE_API_KEY"],
    "x-rapidapi-host": import.meta.env["VITE_JUDGE_CE_HOST"],
    "Content-Type": "application/json",
  },
});

// create submission
export const createSubmissionAction = async ({
  source_code,
  language_id,
  stdin = null,
}: ISubmitCodeArgs) => {
  try {
    const { data }: { data: ICreateSubmission } = await instance.post(
      "/submissions",
      {
        source_code,
        language_id,
        stdin,
      },
      {
        params: {
          base64_encoded: "true",
          wait: "false",
          fields: "*",
        },
      },
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

// get submission
export const getSubmissionAction = async ({
  submissionToken,
}: {
  submissionToken: string;
}) => {
  try {
    const { data }: { data: IGetSubmission } = await instance.get(
      `/submissions/${submissionToken}`,
      {
        params: {
          base64_encoded: "true",
          fields: "*",
        },
      },
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
