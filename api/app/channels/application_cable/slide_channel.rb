class ApplicationCable::SlideChannel < ApplicationCable::Channel
  def subscribed
    stream_from "slide"
  end
end
