class SlideController < ApplicationController
  def index
    render json: {slide: Redis.current.get("slide").to_i}
  end

  def create
    slide = params.require(:slide)
    Redis.current.set("slide", params.require(:slide))
    ActionCable.server.broadcast(
      "slide",
      {
        event: "update",
        slide: slide
      }
    )
    render json: {slide: params.require(:slide)}
  end
end
