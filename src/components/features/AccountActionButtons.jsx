import React from "react";
import { useAuth } from "@/components/features/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";


// 単純なログアウトボタン
export const LogoutButton = ({
  children = (
    <>
      <LogOutIcon className="inline mr-1 -mt-1 w-5 h-5" />
      ログアウト
    </>
  ),
  onLogout,
  ...props
}) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    if (onLogout) onLogout();
  };

  return (
    <Button
      variant="outline"
      className="rounded-lg px-4 py-2"
      onClick={handleLogout}
      {...props}
    >
      {children}
    </Button>
  );
};

// 「別のアカウントでログイン」ボタン（ログアウト後/login遷移）
export const SwitchAccountButton = ({
  children = (
    <>
      <LogOutIcon className="inline mr-1 -mt-1 w-5 h-5" />
      別のアカウントでログイン
    </>
  ),
  ...props
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSwitch = async () => {
    await logout();
    navigate("/login/to/neo-oracle", { replace: true });
  };

  return (
    <Button
      variant="secondary"
      className="rounded-lg px-4 py-2"
      onClick={handleSwitch}
      {...props}
    >
      {children}
    </Button>
  );
};
