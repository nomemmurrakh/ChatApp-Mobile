import Icons from "@/assets/svg";
import { useTheme } from "@/theme";

type EyeSlashIconProps = {
  focused: boolean;
};

export default function EyeSlashIcon({ focused }: EyeSlashIconProps) {
  const { colors } = useTheme();
  return (
    <Icons.EyeSlash
      width={24}
      height={24}
      color={focused ? colors.text : colors.textSecondary}
    />
  );
}
