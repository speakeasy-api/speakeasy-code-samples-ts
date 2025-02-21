interface LanguageLogoProps extends React.SVGProps<SVGElement> {
  language: string;
  color?: string;
  size?: number | string;
}

export const LanguageLogo = ({ language }: LanguageLogoProps) => {
  const dims = { height: 20, width: 20 };
  switch (language) {
    case "python":
      return (
        <img
          {...dims}
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
        />
      );
    case "ruby":
      return (
        <img
          {...dims}
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-plain.svg"
        />
      );
    case "terraform":
      return (
        <img
          {...dims}
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg"
        />
      );
    case "typescript":
      return (
        <img
          {...dims}
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-plain.svg"
        />
      );
    case "csharp":
      return (
        <img
          {...dims}
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-line.svg"
        />
      );
    case "unity":
      return (
        <img
          {...dims}
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-plain.svg"
        />
      );
    case "java":
      return (
        <img
          {...dims}
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
        />
      );
    case "swift":
      return (
        <img
          {...dims}
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg"
        />
      );
    case "php":
      return (
        <img
          {...dims}
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg"
        />
      );
    case "go":
      return (
        <img
          {...dims}
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg"
        />
      );
    case "postman":
      return (
        <img
          {...dims}
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-plain.svg"
        />
      );
    default:
      return null;
  }
};
