import type { AppPluginExtensionCommandConfig } from '@grafana/data';

export type CommandHandlerFunc = AppPluginExtensionCommandConfig['handler'];
export type ConfigureFunc<T> = (extension: T, context?: object) => Partial<T> | undefined;
