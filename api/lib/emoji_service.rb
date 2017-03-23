class EmojiService
  def self.emojis
    @emoji_list ||= Emoji.all.shuffle
  end

  def self.next_emoji
    people = Person.count
    emojis[people].image_filename
  end
end
