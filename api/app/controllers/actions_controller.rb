class ActionsController < ApplicationController
  respond_to :json

  def show
    respond_with Action.find(params[:id])
  end

  def create
    pars = params.permit(:actual_time, :task_id)
    if !session[:person]
      person = Person.create!(emoji: EmojiService.next_emoji)
      session[:person] = person.id
    end
    pars[:person_id] = session[:person]
    render json: Action.create(pars).as_json(methods: :emoji)
  end

  def index
    render json: {
             actions: Action.where(task_id: params[:task_id]).map {
               |a| a.as_json(methods: :emoji)
             }}
  end
end
