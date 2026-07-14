import CircularRipple from "@/components/ui/basic/CircularRipple";
import EyeIcon from "./EyeIcon";
import EyeSlashIcon from "./EyeSlashIcon";

type PasswordVisibleIconProps = {
  secureText: boolean;
  focused: boolean;
  onPress: () => void;
};

export default function PasswordVisibleIcon({
  secureText,
  focused,
  onPress,
}: PasswordVisibleIconProps) {
  return (
    <CircularRipple onPress={onPress}>
      {secureText && <EyeIcon focused={focused} />}
      {!secureText && <EyeSlashIcon focused={focused} />}
    </CircularRipple>
  );
}
