import Icons from "@/assets/svg";
import { useTheme } from "@/theme";

type EyeIconProps = {
  focused: boolean;
};

export default function EyeIcon({ focused }: EyeIconProps) {
  const { colors } = useTheme();
  return (
    <Icons.Eye
      width={24}
      height={24}
      color={focused ? colors.text : colors.textSecondary}
    />
  );
}
