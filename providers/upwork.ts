import type { OAuthUserConfig, OAuthConfig } from "next-auth/src/providers";

interface UpworkProfile extends Record<string, any> {
  server_time: string;
  auth_user: {
    first_name: string;
    last_name: string;
    timezone: string;
    timezone_offset: string;
  };
  info: {
    portrait_50_img: string;
    ref: string;
    portrait_32_img: string;
    has_agency: string;
    portrait_100_img: string;
    company_url: string;
    capacity: {
      provider: string;
      buyer: string;
      affiliate_manager: string;
    };
    location: {
      city: string;
      state: string;
      country: string;
    };
    profile_url: string;
  };
}

export default function Upwork<P extends UpworkProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "upwork",
    name: "Upwork",
    type: "oauth",
    issuer: "https://www.upwork.com",
    authorization: {
      url: "https://www.upwork.com/ab/account-security/oauth2/authorize",
      params: {
        response_type: "code",
        scope: "",
      },
    },
    token: "https://www.upwork.com/api/v3/oauth2/token",
    userinfo: {
      url: "https://www.upwork.com/api/auth/v1/info.json",
    },
    profile(profile) {
      return {
        id: profile.info.ref,
        name: profile.auth_user.first_name + " " + profile.auth_user.last_name,
        email: null,
        image: profile.info.portrait_100_img,
      };
    },
    style: {
      logo: "../../AppIcon_Circle_UpGreen.svg",
      logoDark: "../../AppIcon_Circle_UpGreen.svg",
      bg: "#fff",
      text: "#001e00",
      bgDark: "#001e00",
      textDark: "#fff",
    },
    options,
  };
}
