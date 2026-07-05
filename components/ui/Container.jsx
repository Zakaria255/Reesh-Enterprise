export default function Container({ children, className = '', as: Tag = 'div', ...rest }) {
  return (
    <Tag className={`container-reesh ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
