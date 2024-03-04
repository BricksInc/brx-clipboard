export interface ClipboardPlugin {
  /**
   * Write a value to the clipboard (the "copy" action)
   */
  write(options: WriteOptions): Promise<void>;

  /**
   * Read a value from the clipboard (the "paste" action)
   */
  read(): Promise<ReadResult>;
}

/**
 * Represents the data to be written to the clipboard.
 *
 * @since 1.0.0
 */
export interface WriteOptions {
  /**
   * Text value to copy.
   */
  text?: string;

  /**
   * HTML value to copy.
   */
  html?: string;

  /**
   * Image in [Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) format to copy.
   */
  image?: string;

  /**
   * URL string to copy.
   */
  url?: string;

  /**
   * User visible label to accompany the copied data (Android Only).
   */
  label?: string;
}

/**
 * Represents the data read from the clipboard.
 */
export interface ReadResult {
  /**
   * Text reprensentation of data from the clipboard
   */
  text: string
  /**
   * Data read from the clipboard.
   */
  value: string;

  /**
   * Type of data in the clipboard.
   */
  type: string;
}
