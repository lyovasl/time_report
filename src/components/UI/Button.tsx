import { ComponentPropsWithRef } from "react";

type ButtonProps = ComponentPropsWithRef<"button"> & {
  href?: never;
};

type AnchorProps = ComponentPropsWithRef<"a"> & {
  href?: string ;
};

const isAnchorProps = (
  props: ButtonProps | AnchorProps
): props is AnchorProps => {
  return "href" in props;
};

const Button = (props: ButtonProps | AnchorProps) => {
  if (isAnchorProps(props)) {
    return <a className="button" {...props}></a>;
  }

  return <button className="button" {...props}></button>;
};

export default Button;
