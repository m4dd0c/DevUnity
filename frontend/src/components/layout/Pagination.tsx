import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { formatNumber } from "../../lib/utils";

const Pagination = ({
  setPaginationState,
  isNext,
  query,
  paginationState,
}: {
  isNext: boolean;
  paginationState: IPaginationState;
  query?: string;
  setPaginationState: React.Dispatch<React.SetStateAction<IPaginationState>>;
}) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <div>
        <button
          className="rounded-md border border-[rgba(255,255,255,0.2)] p-2 disabled:text-gray-500"
          disabled={paginationState.page <= 1 || !query}
          onClick={() =>
            setPaginationState({
              ...paginationState,
              page: paginationState.page - 1,
            })
          }
        >
          <IconArrowLeft />
        </button>
      </div>
      <div>{formatNumber(paginationState.page)}</div>
      <div>
        <button
          className="rounded-md border border-[rgba(255,255,255,0.2)] p-2 disabled:text-gray-500"
          disabled={!isNext || !query}
          onClick={() =>
            setPaginationState({
              ...paginationState,
              page: paginationState.page + 1,
            })
          }
        >
          <IconArrowRight />
        </button>
      </div>
    </div>
  );
};
export default Pagination;
