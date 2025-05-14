import * as React from 'react';
import { Body, Caption, Cell, Footer, Head, Header, Row } from './internal';
import { tv, type VariantProps } from 'tailwind-variants';

const table = tv({
  base: ['w-full caption-bottom text-sm'],
});

export type TableProps = React.TableHTMLAttributes<HTMLTableElement> & VariantProps<typeof table>;

/**
 * Table is a container for displaying data efficiently.
 * Usually, it allows users to sort, search, paginate,
 * filter data, and take action on large amounts of data.
 *
 * @see https://www.uiguideline.com/components/table
 */

export const Table = ({ className, ...props }: TableProps) => {
  const classes = table({ className });

  return <table className={classes} {...props} />;
};

Table.Body = Body;
Table.Caption = Caption;
Table.Cell = Cell;
Table.Footer = Footer;
Table.Head = Head;
Table.Header = Header;
Table.Row = Row;
Table.displayName = 'Table';
