import React, { useEffect, useState } from 'react';

import { IconName, SelectableValue } from '@grafana/data';
import { ComponentSize, ValuePicker } from '@grafana/ui';

export interface Props {
  defaultText: string;
  selectedText: string;
  icon: IconName;
  size?: ComponentSize;
  defaultSelection?: string;
  fetchOptions?: () => Promise<Array<SelectableValue<string>>>;
  onChange: (selectedValue: SelectableValue<string>) => void;
  onCreateOption?: (customValue: string) => void;
}

export default function MaterializeButton({
  defaultText,
  selectedText,
  icon,
  size = 'md',
  defaultSelection,
  fetchOptions,
  onChange,
  onCreateOption,
}: Props) {
  const [streamNames, setStreamNames] = useState<Array<SelectableValue<string>>>([
    {
      title: 'Disable',
      description: 'Disable',
      ariaLabel: 'Disable materialized stream',
    },
  ]);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultSelection);

  useEffect(() => {
    fetchOptions?.().then((options) => {
      setStreamNames([
        {
          title: 'Disable',
          description: 'Disable',
          ariaLabel: 'Disable materialized stream',
        },
        ...options,
      ]);
    });
  }, [fetchOptions]);

  const onChangeButton = (selectedValue: SelectableValue<string>) => {
    setSelectedValue(selectedValue.value);
    onChange(selectedValue);
  };

  const onCreateOptionButton = (customValue: string) => {
    setSelectedValue(customValue);
    onCreateOption?.(customValue);
  };

  return (
    <ValuePicker
      label={selectedValue ? `${selectedText}: ${selectedValue}` : defaultText}
      icon={icon}
      size={size}
      allowCustomValue
      options={streamNames}
      onChange={onChangeButton}
      onCreateOption={onCreateOptionButton}
      variant={selectedValue ? 'success' : 'secondary'}
    />
  );
}
