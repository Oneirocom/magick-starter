import { PlusIcon } from "@heroicons/react/24/outline";

type StatusBarProps = {
  progressValue?: number;
  progressMax?: number;
  infinte?: boolean;
  Icon?: any;
  title?: string;
};

const StatusBar = ({
  progressValue = 50,
  progressMax = 100,
  infinte = false,
  Icon = PlusIcon,
  title = "HP",
}: StatusBarProps) => {
  return (
    <div className="text-white">
      <div className="font-berkley-mono flex items-center">
        <span className="mr-2">
          <Icon className="h-5 w-6" />
        </span>
        {title}
      </div>
      <progress
        className="progress progress-info h-3 border-2 border-black bg-[#101112]"
        value={infinte ? progressMax : progressValue}
        max={progressMax}
      ></progress>
      <div className="font-berkley-mono flex items-center justify-end">
        {infinte ? "∞" : progressValue} / {progressMax}
      </div>
    </div>
  );
};

export default StatusBar;
