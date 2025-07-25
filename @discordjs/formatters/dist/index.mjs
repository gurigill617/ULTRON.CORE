var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/escapers.ts
function escapeMarkdown(text, options = {}) {
  const {
    codeBlock: codeBlock2 = true,
    inlineCode: inlineCode2 = true,
    bold: bold2 = true,
    italic: italic2 = true,
    underline: underline2 = true,
    strikethrough: strikethrough2 = true,
    spoiler: spoiler2 = true,
    codeBlockContent = true,
    inlineCodeContent = true,
    escape = true,
    heading: heading2 = false,
    bulletedList = false,
    numberedList = false,
    maskedLink = false
  } = options;
  if (!codeBlockContent) {
    return text.split("```").map((subString, index, array) => {
      if (index % 2 && index !== array.length - 1) return subString;
      return escapeMarkdown(subString, {
        inlineCode: inlineCode2,
        bold: bold2,
        italic: italic2,
        underline: underline2,
        strikethrough: strikethrough2,
        spoiler: spoiler2,
        inlineCodeContent,
        escape,
        heading: heading2,
        bulletedList,
        numberedList,
        maskedLink
      });
    }).join(codeBlock2 ? "\\`\\`\\`" : "```");
  }
  if (!inlineCodeContent) {
    return text.split(/(?<=^|[^`])`(?=[^`]|$)/g).map((subString, index, array) => {
      if (index % 2 && index !== array.length - 1) return subString;
      return escapeMarkdown(subString, {
        codeBlock: codeBlock2,
        bold: bold2,
        italic: italic2,
        underline: underline2,
        strikethrough: strikethrough2,
        spoiler: spoiler2,
        escape,
        heading: heading2,
        bulletedList,
        numberedList,
        maskedLink
      });
    }).join(inlineCode2 ? "\\`" : "`");
  }
  let res = text;
  if (escape) res = escapeEscape(res);
  if (inlineCode2) res = escapeInlineCode(res);
  if (codeBlock2) res = escapeCodeBlock(res);
  if (italic2) res = escapeItalic(res);
  if (bold2) res = escapeBold(res);
  if (underline2) res = escapeUnderline(res);
  if (strikethrough2) res = escapeStrikethrough(res);
  if (spoiler2) res = escapeSpoiler(res);
  if (heading2) res = escapeHeading(res);
  if (bulletedList) res = escapeBulletedList(res);
  if (numberedList) res = escapeNumberedList(res);
  if (maskedLink) res = escapeMaskedLink(res);
  return res;
}
__name(escapeMarkdown, "escapeMarkdown");
function escapeCodeBlock(text) {
  return text.replaceAll("```", "\\`\\`\\`");
}
__name(escapeCodeBlock, "escapeCodeBlock");
function escapeInlineCode(text) {
  return text.replaceAll(/(?<=^|[^`])``?(?=[^`]|$)/g, (match) => match.length === 2 ? "\\`\\`" : "\\`");
}
__name(escapeInlineCode, "escapeInlineCode");
function escapeItalic(text) {
  let idx = 0;
  const newText = text.replaceAll(/(?<=^|[^*])\*([^*]|\*\*|$)/g, (_, match) => {
    if (match === "**") return ++idx % 2 ? `\\*${match}` : `${match}\\*`;
    return `\\*${match}`;
  });
  idx = 0;
  return newText.replaceAll(/(?<=^|[^_])(?<!<a?:.+|https?:\/\/\S+)_(?!:\d+>)([^_]|__|$)/g, (_, match) => {
    if (match === "__") return ++idx % 2 ? `\\_${match}` : `${match}\\_`;
    return `\\_${match}`;
  });
}
__name(escapeItalic, "escapeItalic");
function escapeBold(text) {
  let idx = 0;
  return text.replaceAll(/\*\*(\*)?/g, (_, match) => {
    if (match) return ++idx % 2 ? `${match}\\*\\*` : `\\*\\*${match}`;
    return "\\*\\*";
  });
}
__name(escapeBold, "escapeBold");
function escapeUnderline(text) {
  let idx = 0;
  return text.replaceAll(/(?<!<a?:.+|https?:\/\/\S+)__(_)?(?!:\d+>)/g, (_, match) => {
    if (match) return ++idx % 2 ? `${match}\\_\\_` : `\\_\\_${match}`;
    return "\\_\\_";
  });
}
__name(escapeUnderline, "escapeUnderline");
function escapeStrikethrough(text) {
  return text.replaceAll("~~", "\\~\\~");
}
__name(escapeStrikethrough, "escapeStrikethrough");
function escapeSpoiler(text) {
  return text.replaceAll("||", "\\|\\|");
}
__name(escapeSpoiler, "escapeSpoiler");
function escapeEscape(text) {
  return text.replaceAll("\\", "\\\\");
}
__name(escapeEscape, "escapeEscape");
function escapeHeading(text) {
  return text.replaceAll(/^( {0,2})([*-] )?( *)(#{1,3} )/gm, "$1$2$3\\$4");
}
__name(escapeHeading, "escapeHeading");
function escapeBulletedList(text) {
  return text.replaceAll(/^( *)([*-])( +)/gm, "$1\\$2$3");
}
__name(escapeBulletedList, "escapeBulletedList");
function escapeNumberedList(text) {
  return text.replaceAll(/^( *\d+)\./gm, "$1\\.");
}
__name(escapeNumberedList, "escapeNumberedList");
function escapeMaskedLink(text) {
  return text.replaceAll(/\[.+]\(.+\)/gm, "\\$&");
}
__name(escapeMaskedLink, "escapeMaskedLink");

// src/formatters.ts
function codeBlock(language, content) {
  return content === void 0 ? `\`\`\`
${language}
\`\`\`` : `\`\`\`${language}
${content}
\`\`\``;
}
__name(codeBlock, "codeBlock");
function inlineCode(content) {
  return `\`${content}\``;
}
__name(inlineCode, "inlineCode");
function italic(content) {
  return `_${content}_`;
}
__name(italic, "italic");
function bold(content) {
  return `**${content}**`;
}
__name(bold, "bold");
function underscore(content) {
  return underline(content);
}
__name(underscore, "underscore");
function underline(content) {
  return `__${content}__`;
}
__name(underline, "underline");
function strikethrough(content) {
  return `~~${content}~~`;
}
__name(strikethrough, "strikethrough");
function quote(content) {
  return `> ${content}`;
}
__name(quote, "quote");
function blockQuote(content) {
  return `>>> ${content}`;
}
__name(blockQuote, "blockQuote");
function hideLinkEmbed(url) {
  return `<${url}>`;
}
__name(hideLinkEmbed, "hideLinkEmbed");
function hyperlink(content, url, title) {
  return title ? `[${content}](${url} "${title}")` : `[${content}](${url})`;
}
__name(hyperlink, "hyperlink");
function spoiler(content) {
  return `||${content}||`;
}
__name(spoiler, "spoiler");
function userMention(userId) {
  return `<@${userId}>`;
}
__name(userMention, "userMention");
function channelMention(channelId) {
  return `<#${channelId}>`;
}
__name(channelMention, "channelMention");
function roleMention(roleId) {
  return `<@&${roleId}>`;
}
__name(roleMention, "roleMention");
function chatInputApplicationCommandMention(commandName, subcommandGroupName, subcommandName, commandId) {
  if (commandId !== void 0) {
    return `</${commandName} ${subcommandGroupName} ${subcommandName}:${commandId}>`;
  }
  if (subcommandName !== void 0) {
    return `</${commandName} ${subcommandGroupName}:${subcommandName}>`;
  }
  return `</${commandName}:${subcommandGroupName}>`;
}
__name(chatInputApplicationCommandMention, "chatInputApplicationCommandMention");
function formatEmoji(emojiIdOrOptions, animated) {
  const options = typeof emojiIdOrOptions === "string" ? {
    id: emojiIdOrOptions,
    animated: animated ?? false
  } : emojiIdOrOptions;
  const { id, animated: isAnimated, name: emojiName } = options;
  return `<${isAnimated ? "a" : ""}:${emojiName ?? "_"}:${id}>`;
}
__name(formatEmoji, "formatEmoji");
function channelLink(channelId, guildId) {
  return `https://discord.com/channels/${guildId ?? "@me"}/${channelId}`;
}
__name(channelLink, "channelLink");
function messageLink(channelId, messageId, guildId) {
  return `${guildId === void 0 ? channelLink(channelId) : channelLink(channelId, guildId)}/${messageId}`;
}
__name(messageLink, "messageLink");
var HeadingLevel = /* @__PURE__ */ ((HeadingLevel2) => {
  HeadingLevel2[HeadingLevel2["One"] = 1] = "One";
  HeadingLevel2[HeadingLevel2["Two"] = 2] = "Two";
  HeadingLevel2[HeadingLevel2["Three"] = 3] = "Three";
  return HeadingLevel2;
})(HeadingLevel || {});
function heading(content, level) {
  switch (level) {
    case 3 /* Three */:
      return `### ${content}`;
    case 2 /* Two */:
      return `## ${content}`;
    default:
      return `# ${content}`;
  }
}
__name(heading, "heading");
function listCallback(element, startNumber, depth = 0) {
  if (Array.isArray(element)) {
    return element.map((element2) => listCallback(element2, startNumber, depth + 1)).join("\n");
  }
  return `${"  ".repeat(depth - 1)}${startNumber ? `${startNumber}.` : "-"} ${element}`;
}
__name(listCallback, "listCallback");
function orderedList(list, startNumber = 1) {
  return listCallback(list, Math.max(startNumber, 1));
}
__name(orderedList, "orderedList");
function unorderedList(list) {
  return listCallback(list);
}
__name(unorderedList, "unorderedList");
function subtext(content) {
  return `-# ${content}`;
}
__name(subtext, "subtext");
function time(timeOrSeconds, style) {
  if (typeof timeOrSeconds !== "number") {
    timeOrSeconds = Math.floor((timeOrSeconds?.getTime() ?? Date.now()) / 1e3);
  }
  return typeof style === "string" ? `<t:${timeOrSeconds}:${style}>` : `<t:${timeOrSeconds}>`;
}
__name(time, "time");
function applicationDirectory(applicationId, skuId) {
  const url = `https://discord.com/application-directory/${applicationId}/store`;
  return skuId ? `${url}/${skuId}` : url;
}
__name(applicationDirectory, "applicationDirectory");
var TimestampStyles = {
  /**
   * Short time format, consisting of hours and minutes.
   *
   * @example `16:20`
   */
  ShortTime: "t",
  /**
   * Long time format, consisting of hours, minutes, and seconds.
   *
   * @example `16:20:30`
   */
  LongTime: "T",
  /**
   * Short date format, consisting of day, month, and year.
   *
   * @example `20/04/2021`
   */
  ShortDate: "d",
  /**
   * Long date format, consisting of day, month, and year.
   *
   * @example `20 April 2021`
   */
  LongDate: "D",
  /**
   * Short date-time format, consisting of short date and short time formats.
   *
   * @example `20 April 2021 16:20`
   */
  ShortDateTime: "f",
  /**
   * Long date-time format, consisting of long date and short time formats.
   *
   * @example `Tuesday, 20 April 2021 16:20`
   */
  LongDateTime: "F",
  /**
   * Relative time format, consisting of a relative duration format.
   *
   * @example `2 months ago`
   */
  RelativeTime: "R"
};
var Faces = /* @__PURE__ */ ((Faces2) => {
  Faces2["Shrug"] = "\xAF\\_(\u30C4)_/\xAF";
  Faces2["Tableflip"] = "(\u256F\xB0\u25A1\xB0)\u256F\uFE35 \u253B\u2501\u253B";
  Faces2["Unflip"] = "\u252C\u2500\u252C\u30CE( \xBA _ \xBA\u30CE)";
  return Faces2;
})(Faces || {});
var GuildNavigationMentions = /* @__PURE__ */ ((GuildNavigationMentions2) => {
  GuildNavigationMentions2["Browse"] = "<id:browse>";
  GuildNavigationMentions2["Customize"] = "<id:customize>";
  GuildNavigationMentions2["Guide"] = "<id:guide>";
  return GuildNavigationMentions2;
})(GuildNavigationMentions || {});

// src/index.ts
var version = "0.6.1";
export {
  Faces,
  GuildNavigationMentions,
  HeadingLevel,
  TimestampStyles,
  applicationDirectory,
  blockQuote,
  bold,
  channelLink,
  channelMention,
  chatInputApplicationCommandMention,
  codeBlock,
  escapeBold,
  escapeBulletedList,
  escapeCodeBlock,
  escapeEscape,
  escapeHeading,
  escapeInlineCode,
  escapeItalic,
  escapeMarkdown,
  escapeMaskedLink,
  escapeNumberedList,
  escapeSpoiler,
  escapeStrikethrough,
  escapeUnderline,
  formatEmoji,
  heading,
  hideLinkEmbed,
  hyperlink,
  inlineCode,
  italic,
  messageLink,
  orderedList,
  quote,
  roleMention,
  spoiler,
  strikethrough,
  subtext,
  time,
  underline,
  underscore,
  unorderedList,
  userMention,
  version
};
//# sourceMappingURL=index.mjs.map